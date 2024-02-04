import en from '../../messages/en.json';
import pl from '../../messages/pl.json';

type MessageObject = {
    [key: string]: any;
};

const getAllKeys = (obj: MessageObject): string[] => {
    const keys = [];
    for (let key in obj) {
        if (obj[key] !== undefined && typeof obj[key] === 'object' && obj[key] !== null) {
            keys.push(key);
            keys.push(...getAllKeys(obj[key]).map(subKey => `${key}.${subKey}`));
        } else {
            keys.push(key);
        }
    }

    return keys;
};

it('en.json and pl.json have the same object keys (property names) at all levels', () => {
    const enKeys = getAllKeys(en).sort();
    const plKeys = getAllKeys(pl).sort();

    expect(enKeys).toEqual(plKeys);
});
