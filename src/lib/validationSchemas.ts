/* eslint-disable max-len */
import * as Yup from 'yup';
import profanityList from './profanityList.json';

export const AddLetterSchema = Yup.object({
  text: Yup.string()
    .test(
      'Prohibited word',
      'Your input contains prohibited language',
      (value) => {
        if (!value) return true;
        const words = value.toLowerCase().split(/\b/);
        return !profanityList.some((bannedWord) => words.includes(bannedWord));
      },
    )
    .required().max(500, 'Your letter cannot exceed 500 characters'),
  owner: Yup.string().required(),
  tags: Yup.array()
    .of(Yup.string().oneOf(['vent', 'advice', 'thoughts', 'positivity', 'love', 'family', 'friendship', 'school']).required())
    .min(1, 'You must select at least one tag.').required('You must select at least one tag.'),
});

export const EditLetterSchema = Yup.object({
  id: Yup.number().required(),
  text: Yup.string()
    .test(
      'Prohibited word',
      'Your input contains prohibited language',
      (value) => {
        if (!value) return true;
        const words = value.toLowerCase().split(/\b/);
        return !profanityList.some((bannedWord) => words.includes(bannedWord));
      },
    )
    .required().max(500, 'Your letter cannot exceed 500 characters'),
  owner: Yup.string().required(),
  tags: Yup.array()
    .of(Yup.string().oneOf(['vent', 'advice', 'thoughts', 'positivity', 'love', 'family', 'friendship', 'school']).required())
    .min(1, 'You must select at least one tag.').required(),
  signature: Yup.string().default('Sunshine'),
  createdAt: Yup.date().default(new Date()),
});

export const DeleteLetterSchema = Yup.object({
  id: Yup.number().required(),
});

export const AddReplySchema = Yup.object({
  reply: Yup.string()
    .test(
      'Prohibited word',
      'Your input contains prohibited language',
      (value) => {
        if (!value) return true;
        const words = value.toLowerCase().split(/\b/);
        return !profanityList.some((bannedWord) => words.includes(bannedWord));
      },
    )
    .required().max(250, 'Your reply cannot exceed 250 characters'),
  letterId: Yup.number().required(),
  owner: Yup.string().required(),
});
