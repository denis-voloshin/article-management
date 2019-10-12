import _ from 'lodash/fp';

const reduce = _.reduce.convert({ cap: false });

export const objectDiff = (base, object) => {
  return reduce((acc, value, key) => {
    if (!_.isEqual(value, base[key])) {
      return {
        ...acc,
        [key]: _.isPlainObject(value) && _.isPlainObject(base[key])
          ? objectDiff(base[key], value)
          : value
      };
    }

    return acc;
  }, {})(object);
};
