"use client";

function Test({ todo }) {
  // const { browserSupportsSpeechRecognition } = useSpeechRecognition();

  // if (!browserSupportsSpeechRecognition) {
  //   return <div>This Browser is not support Speech Recognition function.</div>;
  // }

  return <div>{JSON.stringify(todo)}</div>;
}

export default Test;
