import { describe, it, expect, beforeEach, vi } from 'vitest';
import { _saveQuestion, _saveQuestionAnswer, _getUsers, _getQuestions } from '../../_DATA';

describe('_DATA.js API Functions', () => {
  // ==================== _getUsers Tests ====================
  describe('_getUsers()', () => {
    it('should return an object with user data', async () => {
      const users = await _getUsers();
      expect(users).toBeDefined();
      expect(typeof users).toBe('object');
      expect(Object.keys(users).length).toBeGreaterThan(0);
    });

    it('should return users with required properties', async () => {
      const users = await _getUsers();
      const firstUser = Object.values(users)[0];
      
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('password');
      expect(firstUser).toHaveProperty('avatarURL');
      expect(firstUser).toHaveProperty('answers');
      expect(firstUser).toHaveProperty('questions');
    });
  });

  // ==================== _getQuestions Tests ====================
  describe('_getQuestions()', () => {
    it('should return an object with question data', async () => {
      const questions = await _getQuestions();
      expect(questions).toBeDefined();
      expect(typeof questions).toBe('object');
      expect(Object.keys(questions).length).toBeGreaterThan(0);
    });

    it('should return questions with required properties', async () => {
      const questions = await _getQuestions();
      const firstQuestion = Object.values(questions)[0];
      
      expect(firstQuestion).toHaveProperty('id');
      expect(firstQuestion).toHaveProperty('author');
      expect(firstQuestion).toHaveProperty('timestamp');
      expect(firstQuestion).toHaveProperty('optionOne');
      expect(firstQuestion).toHaveProperty('optionTwo');
    });
  });

  // ==================== _saveQuestion Tests ====================
  describe('_saveQuestion()', () => {
    it('should successfully save a question with valid data and return the saved question with expected fields', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        optionTwoText: 'Option Two Text',
        author: 'sarahedo',
      };

      const result = await _saveQuestion(questionData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('author', 'sarahedo');
      expect(result).toHaveProperty('optionOne');
      expect(result).toHaveProperty('optionTwo');
      expect(result.optionOne).toHaveProperty('text', 'Option One Text');
      expect(result.optionTwo).toHaveProperty('text', 'Option Two Text');
      expect(result.optionOne).toHaveProperty('votes');
      expect(result.optionTwo).toHaveProperty('votes');
      expect(Array.isArray(result.optionOne.votes)).toBe(true);
      expect(Array.isArray(result.optionTwo.votes)).toBe(true);
    });

    it('should return an error when optionOneText is missing', async () => {
      const questionData = {
        optionTwoText: 'Option Two Text',
        author: 'sarahedo',
      };

      try {
        await _saveQuestion(questionData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when optionTwoText is missing', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        author: 'sarahedo',
      };

      try {
        await _saveQuestion(questionData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when author is missing', async () => {
      const questionData = {
        optionOneText: 'Option One Text',
        optionTwoText: 'Option Two Text',
      };

      try {
        await _saveQuestion(questionData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when invalid data is provided', async () => {
      try {
        await _saveQuestion({});
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });

  // ==================== _saveQuestionAnswer Tests ====================
  describe('_saveQuestionAnswer()', () => {
    it('should successfully save a question answer with valid data and return true', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };

      const result = await _saveQuestionAnswer(answerData);

      expect(result).toBe(true);
    });

    it('should return an error when authedUser is missing', async () => {
      const answerData = {
        qid: '8xf0y6ziyjabvozdd253nd',
        answer: 'optionOne',
      };

      try {
        await _saveQuestionAnswer(answerData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when qid is missing', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        answer: 'optionOne',
      };

      try {
        await _saveQuestionAnswer(answerData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when answer is missing', async () => {
      const answerData = {
        authedUser: 'sarahedo',
        qid: '8xf0y6ziyjabvozdd253nd',
      };

      try {
        await _saveQuestionAnswer(answerData);
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeDefined();
        expect(typeof error).toBe('string');
      }
    });

    it('should return an error when invalid data is provided', async () => {
      try {
        await _saveQuestionAnswer({});
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error).toBeTruthy();
      }
    });
  });
});
