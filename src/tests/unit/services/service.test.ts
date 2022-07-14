import CarService from '../../../services/CarService';
import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon';
import { Model } from 'mongoose';

import { validCar } from '../../../../__tests__/utils/CarsMock';

describe('Testes para camada Service', () => {
  describe('testa create da Service', () => {
    beforeEach(() => {
      sinon.stub(Model, "create").resolves(validCar);
    });
    afterEach(() => {
      (Model.create as SinonStub).restore();
    })
    it('cria novo carro no Banco', async () => {
      const carService = new CarService();
      const createdCar = await carService.create(validCar);
      expect(createdCar).to.be.deep.equal(validCar)
    })
  }); 

    describe('testa get da service', () => {
      beforeEach(() => {
        sinon.stub(Model, "find").resolves([validCar]);
      });
      afterEach(() => {
        (Model.find as SinonStub).restore();
      })
      it('retorna todos os carros', async () => {
        const carService = new CarService();
        const getAll = await carService.read();
        expect(getAll).to.be.deep.equal([validCar])
      })
  })

  describe('testa get by Id da service', () => {
    beforeEach(() => {
      sinon.stub(Model, "findOne").resolves([validCar]);
    });
    afterEach(() => {
      (Model.findOne as SinonStub).restore();
    });
    it('retorna dados pra um Id da service', async () => {
      const carService = new CarService();
      const getById = await carService.readOne('4edd40c86762e0fb12000003');
      expect(getById).to.be.deep.equal([validCar])
    })
  })
})