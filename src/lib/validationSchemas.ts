import * as Yup from 'yup';

// export const AddStuffSchema = Yup.object({
//   name: Yup.string().required(),
//   quantity: Yup.number().positive().required(),
//   condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
//   owner: Yup.string().required(),
// });

// export const EditStuffSchema = Yup.object({
//   id: Yup.number().required(),
//   name: Yup.string().required(),
//   quantity: Yup.number().positive().required(),
//   condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
//   owner: Yup.string().required(),
// });

// export interface Contact {
//   firstName: string;
//   lastName: string;
//   address: string;
//   image: string;
//   description: string;
//   owner: string
// }

export const AddLetterSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  text: Yup.string().required(),
  owner: Yup.string().required(),
  tags: Yup.array().of(Yup.string().oneOf(['happy', 'neutral', 'sad', 'angry']).required()).required(),
});

export const EditLetterSchema = Yup.object({
  id: Yup.number().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  text: Yup.string().required(),
  owner: Yup.string().required(),
  tags: Yup.array().of(Yup.string().oneOf(['happy', 'neutral', 'sad', 'angry']).required()).required(),
});

export const DeleteLetterSchema = Yup.object({
  id: Yup.number().required(),
});

export const AddReplySchema = Yup.object({
  reply: Yup.string().required(),
  letterId: Yup.number().required(),
  owner: Yup.string().required(),
});
