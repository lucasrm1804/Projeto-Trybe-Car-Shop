import CarsModel from '../../../models/CarModel';
import { expect } from 'chai';
import sino, { SinonStub } from 'sinon';
import { Model } from 'mongoose';

import { validCar } from '../../../../__tests__/utils/CarsMock';

describe('Testes para camada Model', () => {
  describe('teste rota post', () => {
    before(() => {
      sino.stub(Model, 'create').resolves(validCar);
    });

    after(() => {
      (Model.create as SinonStub).restore();
    });

    it('cria novo carro no Banco', async () => {
      const carModel = new CarsModel();

      const created = await carModel.create(validCar);

      expect(created).to.be.deep.equal(validCar);
    });
  });

    describe('teste para rota get', () => {
      before(() => {
        sino.stub(Model, 'find').resolves([validCar]);
      });

      after(() => {
        (Model.find as SinonStub).restore();
      });

      it('retorna todos os carros do banco', async () => {
        const carModel = new CarsModel();

        const getAll = await carModel.read();

        expect(getAll).to.be.deep.equal([validCar]);
      });
    });

      describe('teste para rota get by Id', () => {
      before(() => {
        sino.stub(Model, 'findOne').resolves(validCar);
      });

      after(() => {
        (Model.findOne as SinonStub).restore();
      });

      it('retorna dados pra um id', async () => {
        const carModel = new CarsModel();

        const getById = await carModel.readOne('4edd40c86762e0fb12000003');

        expect(getById).to.be.deep.equal(validCar);
      });
    });

}); 