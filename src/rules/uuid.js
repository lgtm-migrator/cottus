import { NOT_UUID } from '../errors';
import { Mask } from '../utils';
import StringRule from './string';
import Base from './Base';

const hexNumbers = new Set([ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ]);

const hexFormatters = {
    f : char => hexNumbers.has(char),
    v : char => char === '4'
};

const mask = new Mask('ffffffff-ffff-vfff-ffff-ffffffffffff', hexFormatters);

export default class UUIDRule extends Base {
    static schema = 'uuid';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);
        const error = mask.validate(string);

        if (error) throw new NOT_UUID();

        return string;
    }
}
