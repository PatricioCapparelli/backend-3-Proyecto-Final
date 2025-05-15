import GenericRepository from "./GenericRepository.js";

export default class PetRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
    save = (pet) => {
        return this.dao.save(pet);
    }
}