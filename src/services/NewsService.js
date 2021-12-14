class NewsService {
    static baseUrl = "https://indicator.ru/api/v2/topics";

    static getNews = ({limit}) => {
        return new Promise((resolve, reject) => {
            const param = this.baseUrl + `?include=image&fields=headline,announce,published_at&limit=${limit}&topic_type=article`;
            fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(param)}`)
                .then((response) => {
                    return response.json();
                })
                .then(({contents}) => {
                    const {data, included} = JSON.parse(contents) || {};
                    const news = [];
                    for (let i = 0; i < data.length; i++) {
                        const item = data[i] ? {
                            id: data[i]?.id,
                            title: data[i]?.attributes?.headline,
                            description: data[i]?.attributes?.announce,
                            date_at: data[i]?.attributes?.published_at,
                            img: `https://indicator.ru/${included[i]?.attributes?.versions?.original?.rel_url}`,
                        } : {}
                        news.push(item);
                    }
                    return resolve(news);
                })
                .catch((error) => {
                    return reject(error?.message);
                })
        });
    }
}

export default NewsService;
