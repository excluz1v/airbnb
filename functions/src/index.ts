import './bootstrap';
// import exampleFunction from './flat/exampleFunction';

<<<<<<< HEAD
// eslint-disable-next-line import/prefer-default-export
// export { exampleFunction };
=======
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions
    .https
    .onRequest((req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Credentials", "true");
      res.status(204).send("hello world");
    });

const schema = Joi.object().keys({
  address: Joi.string().min(3).required(),
  price: Joi.number().integer().max(1000000).positive().required(),
  description: Joi.string().max(300),
});

type Tparams = {
  address: string;
  price: number;
  description?: string;
}

export const createFlat = functions

    .https
    .onCall((data: Tparams, context) => {
      const {error, value} = schema.validate(data);
      if (!error) return value;
      throw new functions.https.HttpsError(
          "invalid-argument",
          "invalid fields"
      );
    });
>>>>>>> ecb8f636fbbe9924b0d6cdd47a541885c4fd725d
