import profileReducer from "../profileReducer";
import {INIT_PROFILE_NAME} from '../../actions/initProfileName';

describe('test profileReducer', () => {
    it('returns state with new name "Test name"', () => {
        const expected = {
            name: 'Test name'
        };
		const action = {type: INIT_PROFILE_NAME, name: 'Test name'};
        const received = profileReducer({}, action);
        expect(received).toEqual(expected);
    });
    it('returns current state', () => {
            const expected = {name: 'current name'};
            const action = {type: 'wrong type', name: 'some name'};
            const received = profileReducer({name: 'current name'}, action);
            expect(received).toEqual(expected);
    });
});
