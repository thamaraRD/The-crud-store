const uniqueValidator = require("mongoose-unique-validator");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "El usuario requiere un nombre"],
      minlength: [3, "Mínimo 3 caracteres"],
    },
    lastName: {
      type: String,
      required: [true, "El usuario requiere un apellido"],
      minlength: [3, "Mínimo 3 caracteres"],
    },
    email: {
      type: String,
      required: [true, "El usuario requiere un e-mail válido"],
      unique: [true, "El e-mail ya existe en la base de datos"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Por favor, ingrese un correo válido",
      },
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [6, "Mínimo 6 caracteres"],
    },

},
  { timestamps: true }
);

//Aplicar el plugin de uniqueValidator al UserSchema
UserSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

//Convertir el esquema en modelo y exportarlo
const UserModel = model("UserModel", UserSchema);
module.exports = UserModel;
