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
        sinon.stub(ser, "create").resolves(validCar);
      });
      afterEach(() => {
        (Model.create as SinonStub).restore();
      })
      it('retorna todos os carros', async () => {
        const carService = new CarService();
        const getAll = await carService.read();
        expect(getAll).to.be.deep.equal(validCar)
      })

  })
})