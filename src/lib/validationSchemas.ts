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
    .required(),
  owner: Yup.string().required(),
  tags: Yup.array().of(Yup.string().oneOf(['happy', 'neutral', 'sad', 'angry']).required()).required(),
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
    .required(),
  owner: Yup.string().required(),
  tags: Yup.array().of(Yup.string().oneOf(['happy', 'neutral', 'sad', 'angry']).required()).required(),
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
    .required(),
  letterId: Yup.number().required(),
  owner: Yup.string().required(),
});
