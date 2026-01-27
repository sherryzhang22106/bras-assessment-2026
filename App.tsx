
import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { AccessCodeModal } from './components/AccessCodeModal';
import { Disclaimer } from './components/Disclaimer';
import { Questionnaire } from './components/Questionnaire';
import { BasicReport } from './components/BasicReport';
import { AIReport } from './components/AIReport';
import { AppStep, UserScores, Option } from './types';
import { calculateScores } from './utils/scoring';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>('LANDING');
  const [scores, setScores] = useState<UserScores | null>(null);
  const [answers, setAnswers] = useState<Record<number, Option>>({});
  const [showAI, setShowAI] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [accessCode, setAccessCode] = useState<string>('');

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
    setAiReport(null); // 清除旧的分析结果，确保新测试能触发新分析
    setShowAI(false);
    setAiLoading(false);
    setStep('REPORT');
  };

  const handleGenerateAI = () => {
    setShowAI(true);
    setAiLoading(true);
  };

  const handleAIReportReady = (content: string) => {
    setAiReport(content);
    setAiLoading(false);
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
          onGenerateAI={handleGenerateAI}
          showAIReport={showAI}
          aiReportContent={aiReport}
          aiReportLoading={aiLoading}
        />
      )}
      
      {step === 'REPORT' && scores && showAI && aiLoading && (
        <AIReport 
          scores={scores} 
          answers={answers}
          cachedContent={aiReport}
          accessCode={accessCode}
          onReportReady={handleAIReportReady}
          onClose={() => {}} 
        />
      )}
    </div>
  );
};

export default App;
