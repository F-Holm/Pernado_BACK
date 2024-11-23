import supertest, { Test } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { defaultErrMsg as ValidatorErr } from 'jet-validator';
import insertUrlParams from 'inserturlparams';

import app from '@src/server';

import UsuarioRepo from '@src/repos/UsuarioRepo';
import Usuario, { IUsuario } from '@src/models/Usuario';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { USUARIO_NOT_FOUND_ERR } from '@src/services/UsuarioService';

import Paths from 'spec/support/Paths';
import apiCb from 'spec/support/apiCb';
import { TApiCb } from 'spec/types/misc';
import Direccion from '@src/models/Direccion';
import { get } from 'http';


// Dummy users for GET req
const getDummyUsers = () => {

  return [
    Usuario.new(1,'sean.maxwell@gmail.com','43245344','Sean','Maxwell','Sean Maxwell','dasds',new Date(),Direccion.new('Main St',2343,0,'CASA','Buenos Aires','C.A.B.A',14192) ),
    Usuario.new(2,'dassean.maxwell@gmail.com','43245324','Seasdan','Madsaxwell','Seandas Maxwell','dasdds',new Date(),Direccion.new('Main St',2344,3,'DPARTAMENTO','Buenos Aires','C.A.B.A',3123) ),
    Usuario.new(3,'sesaan.maxwell@gmail.com','4323344','Seaan','Masxwell','Sean Maxl','sds',new Date(),Direccion.new('Main St',2323,0,'CASA','Buenos Aires','C.A.B.A',2192) ),
  ];
};


// Tests
describe('UsuarioRouter', () => {

  let agent: TestAgent<Test>;

  // Run before all tests
  beforeAll(done => {
    agent = supertest.agent(app);
    done();
  });

  // Get all users
  describe(`"GET:${Paths.Usuario.Get}"`, () => {

    // Setup API
    const api = (cb: TApiCb) =>
      agent
        .get(Paths.Usuario.Get)
        .end(apiCb(cb));

    // Success
    it('should return a JSON object with all the users and a status code ' +
    `of "${HttpStatusCodes.OK}" if the request was successful.`, (done) => {
      // Add spy
      const data = getDummyUsers();
      spyOn(UsuarioRepo, 'getAll').and.resolveTo(data);
      // Call API
      api(res => {
       // console.log(res.body);
      //console.log(data);
      let a: IUsuario[] = res.body.usuarios as IUsuario[];
      var date = new Date(a[0].fechaNacimiento);

      // Crear un objeto DateTimeFormat con opciones específicas para Argentina
      var dateFormat = new Intl.DateTimeFormat("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      timeZoneName: "short"
    });

        // Formatear la fecha
        const formatted = dateFormat.format(date);

        expect(res.status).toBe(HttpStatusCodes.OK);
        console.log(a[0]);
        expect(res.body).toEqual({ usuarios: data });
        done();
      });
    });
  });

  // Test add user
  describe(`"POST:${Paths.Usuario.Add}"`, () => {

    const ERROR_MSG = `${ValidatorErr}"Usuario".`,
      DUMMY_USER = getDummyUsers()[0];

    // Setup API

    const callApi = (user: IUsuario | null, cb: TApiCb) =>
      agent
        .post(Paths.Usuario.Add)
        .send( {usuario:user!} )
        .end(apiCb(cb));

    // Test add user success
    it(`should return a status code of "${HttpStatusCodes.CREATED}" if the ` +
    'request was successful.', (done) => {
      // Spy
      spyOn(UsuarioRepo, 'add').and.resolveTo();
      // Call api
      callApi(DUMMY_USER, res => {

        expect(res.status).toBe(HttpStatusCodes.CREATED);
        done();
      });
    });

    // Missing param
    it(`should return a JSON object with an error message of "${ERROR_MSG}" ` +
    `and a status code of "${HttpStatusCodes.BAD_REQUEST}" if the user ` +
    'param was missing.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });
  });

  // Update users
  describe(`"PUT:${Paths.Usuario.Update}"`, () => {

    const ERROR_MSG = `${ValidatorErr}"user".`,
      DUMMY_USER = getDummyUsers()[0];

    // Setup API
    const callApi = (user: IUsuario | null, cb: TApiCb) =>
      agent
        .put(Paths.Usuario.Update)
        .send({ user })
        .end(apiCb(cb));

    // Success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` +
    'request was successful.', (done) => {
      // Setup spies
      spyOn(UsuarioRepo, 'update').and.resolveTo();
      spyOn(UsuarioRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(DUMMY_USER, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // Param missing
    it(`should return a JSON object with an error message of "${ERROR_MSG}" ` +
    `and a status code of "${HttpStatusCodes.BAD_REQUEST}" if the user ` +
    'param was missing.', (done) => {
      // Call api
      callApi(null, res => {
        expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
        expect(res.body.error).toBe(ERROR_MSG);
        done();
      });
    });

    // User not found
    it('should return a JSON object with the error message of ' +
    `"${USUARIO_NOT_FOUND_ERR}" and a status code of ` +
    `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`, (done) => {
      // Call api
      callApi(DUMMY_USER, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(USUARIO_NOT_FOUND_ERR);
        done();
      });
    });
  });

  // Delete User
  describe(`"DELETE:${Paths.Usuario.Delete}"`, () => {

    // Call API
    const callApi = (id: number, cb: TApiCb) =>
      agent
        .delete(insertUrlParams(Paths.Usuario.Delete, { id }))
        .end(apiCb(cb));

    // Success
    it(`should return a status code of "${HttpStatusCodes.OK}" if the ` +
    'request was successful.', (done) => {
      // Setup spies
      spyOn(UsuarioRepo, 'delete').and.resolveTo();
      spyOn(UsuarioRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(5, res => {
        expect(res.status).toBe(HttpStatusCodes.OK);
        done();
      });
    });

    // User not found
    it('should return a JSON object with the error message of ' +
    `"${USUARIO_NOT_FOUND_ERR}" and a status code of ` +
    `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`, done => {
      // Setup spies
      callApi(-1, res => {
        expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
        expect(res.body.error).toBe(USUARIO_NOT_FOUND_ERR);
        done();
      });
    });
  });
});
