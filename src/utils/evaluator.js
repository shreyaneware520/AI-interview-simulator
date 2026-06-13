export const evaluateAnswer = (answer, expectedKeywords) => {
  if (!answer || answer.trim().length === 0) {
    return {
      score: 0,
      verdict: "No answer provided.",
      feedback: "Please provide a detailed answer to the question."
    };
  }

  const wordCount = answer.trim().split(/\s+/).length;
  let matches = 0;
  
  const lowerAnswer = answer.toLowerCase();
  expectedKeywords.forEach(kw => {
    if (lowerAnswer.includes(kw.toLowerCase())) {
      matches += 1;
    }
  });

  // Calculate score out of 10
  // Length contribution: max 4 points if > 30 words
  const lengthScore = Math.min((wordCount / 30) * 4, 4);
  
  // Keyword contribution: max 6 points if matches all
  const keywordRatio = expectedKeywords.length > 0 ? matches / expectedKeywords.length : 1;
  const keywordScore = keywordRatio * 6;

  let totalScore = Math.round(lengthScore + keywordScore);
  
  // Cap at 10
  totalScore = Math.min(totalScore, 10);
  
  let verdict = "";
  let feedback = "";

  if (totalScore >= 8) {
    verdict = "Excellent understanding of the concept.";
    feedback = "You hit all the key points clearly.";
  } else if (totalScore >= 5) {
    verdict = "Good attempt, but missing some key technical details.";
    feedback = "Try to elaborate more on the underlying mechanisms and edge cases.";
  } else {
    verdict = "Your answer was too brief or missed the core concepts.";
    feedback = "Focus on clearly defining the terms and providing examples.";
  }

  return {
    score: totalScore,
    verdict,
    feedback,
    matchedKeywords: matches,
    totalKeywords: expectedKeywords.length
  };
};
