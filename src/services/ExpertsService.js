import firebase from "firebase";

export class ExpertsService {
    /**
     * Поиск экспертов по предметным областям.
     * @param {string[]} subjects Предметные области, которыми должен владеть эксперт полностью. Массив в OrderFormPage.js под названием `subjectListRu`.
     * @returns {AsyncGenerator<string>} Id экспертов.
     */
    static async *findExpertsBySubjects(subjects) {
        let response = await firebase.firestore().collection("users").get();
        let docs = response.docs;
        for (let doc of docs) {
            if (doc.data().isExpert && subjects.every(x => doc.data().expertSubjects.includes(x))) {
                yield doc.id;
            }
        }
    }
}
