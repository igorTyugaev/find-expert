import firebase from "firebase";
import { firebaseNames } from "../constants";

export class ExpertsService {
    /**
     * Поиск экспертов по предметным областям.
     * @param {string[]} subjects Предметные области, которыми должен владеть эксперт полностью. Массив в selectOptions.js под названием `subjectListRu`.
     * @returns {AsyncGenerator<string>} Id экспертов.
     */
    static async *findExpertsBySubjects(subjects) {
        let response = await firebase.firestore().collection(firebaseNames.collections.users).get();
        let docs = response.docs;
        for (let doc of docs) {
            if (doc.data().isExpert && subjects.every(x => doc.data().expertSubjects.includes(x))) {
                yield doc.id;
            }
        }
    }
}
