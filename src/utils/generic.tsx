import pkg from '../../package.json';

export const rawPkgName = pkg.name;
export const pkgVersion = pkg.version;

export const humanPakageName = rawPkgName
  .replace('-', ' ')
  .split(' ')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
