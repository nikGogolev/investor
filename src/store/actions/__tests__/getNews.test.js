import { getNewsRequest, GET_NEWS_REQUEST } from "../getNews";

describe('test getNews actions', () => {
    it('returns result of call fetchNewsRequest()', () => {
        const expected = {
            type: GET_NEWS_REQUEST,
        };
        const received = getNewsRequest();
        expect(received).toEqual(expected);
    })
});