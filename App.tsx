
import React, { useState, useRef } from 'react';
import { LandingPage } from './components/LandingPage';
import { AccessCodeModal } from './components/AccessCodeModal';
import { Disclaimer } from './components/Disclaimer';
import { Questionnaire } from './components/Questionnaire';
import { BasicReport } from './components/BasicReport';
import { AIReport } from './components/AIReport';
import { AppStep, UserScores, Option } from './types';
import { calculateScores } from './utils/scoring';
import { Part1Summary, saveAssessment, generateSessionId } from './services/apiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('LANDING');
  const [scores, setScores] = useState<UserScores | null>(null);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [accessCode, setAccessCode] = useState<string>('');
  const sessionIdRef = useRef<string>('');

  // 上篇状态
  const [showAIPart1, setShowAIPart1] = useState(false);
  const [aiReportPart1, setAiReportPart1] = useState<string | null>(null);
  const [aiLoadingPart1, setAiLoadingPart1] = useState(false);

  // 下篇状态
  const [showAIPart2, setShowAIPart2] = useState(false);
  const [aiReportPart2, setAiReportPart2] = useState<string | null>(null);
  const [aiLoadingPart2, setAiLoadingPart2] = useState(false);

  // 上篇摘要（用于生成下篇）
  const [part1Summary, setPart1Summary] = useState<Part1Summary | null>(null);

  const handleStart = () => setStep('ACCESS_CODE');
  const handleAccessSuccess = (code: string) => {
    setAccessCode(code);
    setStep('DISCLAIMER');
  };
  const handleDisclaimerAgree = () => setStep('ASSESSMENT');

  const handleAssessmentComplete = async (completedAnswers: Record<number, Option>) => {
    const computedScores = calculateScores(completedAnswers);
    setAnswers(completedAnswers);
    setScores(computedScores);
    // 清除旧的分析结果
    setAiReportPart1(null);
    setAiReportPart2(null);
    setShowAIPart1(false);
    setShowAIPart2(false);
    setAiLoadingPart1(false);
    setAiLoadingPart2(false);
    setPart1Summary(null);
    setStep('REPORT');

    // 测评完成后立即保存数据（不含AI报告）
    const newSessionId = generateSessionId();
    sessionIdRef.current = newSessionId;
    try {
      await saveAssessment(newSessionId, completedAnswers, computedScores, undefined, accessCode);
      console.log('✅ 测评数据已保存', { sessionId: newSessionId, accessCode });
    } catch (error) {
      console.error('⚠️ 保存测评数据失败:', error);
    }
  };

  // 生成上篇
  const handleGenerateAIPart1 = () => {
    setShowAIPart1(true);
    setAiLoadingPart1(true);
  };

  // 上篇生成完成
  const handleAIPart1Ready = async (content: string, summary: Part1Summary) => {
    setAiReportPart1(content);
    setAiLoadingPart1(false);
    setPart1Summary(summary);

    // 保存上篇报告到后台
    if (sessionIdRef.current && scores) {
      try {
        await saveAssessment(sessionIdRef.current, answers, scores, content, accessCode);
        console.log('✅ 上篇AI报告已保存');
      } catch (error) {
        console.error('⚠️ 保存上篇AI报告失败:', error);
      }
    }
  };

  // 生成下篇
  const handleGenerateAIPart2 = () => {
    setShowAIPart2(true);
    setAiLoadingPart2(true);
  };

  // 下篇生成完成
  const handleAIPart2Ready = async (content: string) => {
    setAiReportPart2(content);
    setAiLoadingPart2(false);

    // 保存完整报告（上篇+下篇）到后台
    if (sessionIdRef.current && scores) {
      const fullReport = (aiReportPart1 || '') + '\n\n' + content;
      try {
        await saveAssessment(sessionIdRef.current, answers, scores, fullReport, accessCode);
        console.log('✅ 完整AI报告已保存');
      } catch (error) {
        console.error('⚠️ 保存完整AI报告失败:', error);
      }
    }
  };

  return (
    <div className="font-sans text-slate-900">
      {step === 'LANDING' && <LandingPage onStart={handleStart} />}

      {step === 'ACCESS_CODE' && (
        <AccessCodeModal
          onSuccess={handleAccessSuccess}
          onCancel={() => setStep('LANDING')}
        />
      )}

      {step === 'DISCLAIMER' && (
        <Disclaimer
          onAgree={handleDisclaimerAgree}
          onDecline={() => setStep('LANDING')}
        />
      )}

      {step === 'ASSESSMENT' && (
        <Questionnaire onComplete={handleAssessmentComplete} />
      )}

      {step === 'REPORT' && scores && (
        <BasicReport
          scores={scores}
          answers={answers}
          // 上篇相关
          onGenerateAIPart1={handleGenerateAIPart1}
          showAIPart1={showAIPart1}
          aiReportPart1={aiReportPart1}
          aiLoadingPart1={aiLoadingPart1}
          // 下篇相关
          onGenerateAIPart2={handleGenerateAIPart2}
          showAIPart2={showAIPart2}
          aiReportPart2={aiReportPart2}
          aiLoadingPart2={aiLoadingPart2}
          // 上篇摘要
          part1Summary={part1Summary}
        />
      )}

      {step === 'REPORT' && scores && showAIPart1 && aiLoadingPart1 && (
        <AIReport
          scores={scores}
          answers={answers}
          cachedContent={aiReportPart1}
          part="part1"
          onReportReady={handleAIPart1Ready}
          onClose={() => {}}
        />
      )}

      {step === 'REPORT' && scores && showAIPart2 && aiLoadingPart2 && part1Summary && (
        <AIReport
          scores={scores}
          answers={answers}
          cachedContent={aiReportPart2}
          part="part2"
          part1Summary={part1Summary}
          onReportReady={handleAIPart2Ready}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default App;
