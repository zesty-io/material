/**
 * Node ESM resolve hook that retries extensionless relative imports with `.js`.
 *
 * `@material/material-color-utilities` 0.4.0 declares `"type": "module"` but
 * its own internal imports omit file extensions (e.g. `../dynamiccolor/dynamic_scheme`).
 * Bundlers resolve those; the Node ESM resolver, which requires explicit
 * extensions, does not — so importing the package under plain `node` throws
 * ERR_MODULE_NOT_FOUND from inside the package itself.
 *
 * Scope is deliberately narrow: only relative specifiers that have no extension
 * and only after the normal resolution has already failed.
 */
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isRelative = specifier.startsWith("./") || specifier.startsWith("../");
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(specifier);
    if (isRelative && !hasExtension) {
      try {
        return await nextResolve(`${specifier}.js`, context);
      } catch {
        return await nextResolve(`${specifier}/index.js`, context);
      }
    }
    throw error;
  }
}
