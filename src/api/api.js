import { apiFetch } from './client';

export const getModules = async () => {
  const data = await apiFetch('/modules/');
  return data;
};
export const getModuleTest = async (moduleId) => {
  return await apiFetch(`/modules/${moduleId}/test/`);
};

export const getTestQuestions = async (testId) => {
  return await apiFetch(`/tests/${testId}/questions/`);
};

export const checkAnswer = async ({ testId, questionId, optionId }) => {
  return await apiFetch('/answers/check/', {
    method: 'POST',
    body: JSON.stringify({
      test_id: testId,
      question_id: questionId,
      option_id: optionId,
    }),
  });
};