
import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AccessCodeModal } from './components/AccessCodeModal';
import { Disclaimer } from './components/Disclaimer';
import { Questionnaire } from './components/Questionnaire';
import { BasicReport } from './components/BasicReport';
import { AIReport } from './components/AIReport';
import { AppStep, UserScores, Option } from './types';
import { calculateScores } from './utils/scoring';
import { Part1Summary } from './services/apiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('LANDING');
  const [scores, setScores] = useState<UserScores | null>(null);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [accessCode, setAccessCode] = useState<string>('');

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

  const handleAssessmentComplete = (completedAnswers: Record<number, Option>) => {
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
  };

  // 生成上篇
  const handleGenerateAIPart1 = () => {
    setShowAIPart1(true);
    setAiLoadingPart1(true);
  };

  // 上篇生成完成
  const handleAIPart1Ready = (content: string, summary: Part1Summary) => {
    setAiReportPart1(content);
    setAiLoadingPart1(false);
    setPart1Summary(summary);
  };

  // 生成下篇
  const handleGenerateAIPart2 = () => {
    setShowAIPart2(true);
    setAiLoadingPart2(true);
  };

  // 下篇生成完成
  const handleAIPart2Ready = (content: string) => {
    setAiReportPart2(content);
    setAiLoadingPart2(false);
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
          accessCode={accessCode}
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
          accessCode={accessCode}
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
