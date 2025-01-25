import process from 'process';
import readline from 'readline';

/**
 * @param {object} arg
 * @param {string} arg.question
 * @returns {Promise<string>}
 */
const askQuestionInTerminal = async ({ question }) => {
  const readlineDialogue = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve) => readlineDialogue.question(question, resolve));
  readlineDialogue.close();
  return answer;
};

export default askQuestionInTerminal;
