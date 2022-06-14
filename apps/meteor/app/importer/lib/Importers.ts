import { ImporterInfo } from './ImporterInfo';

/** Container class which holds all of the importer details. */
class ImportersContainer {
	importers: Map<string, ImporterInfo>;

	constructor() {
		this.importers = new Map();
	}

	/**
	 * Adds an importer to the import collection. Adding it more than once will
	 * overwrite the previous one.
	 *
	 * @param info The information related to the importer.
	 * @param importer The class for the importer, will be undefined on the client.
	 */
	add(info: ImporterInfo, importer: any): ImporterInfo | undefined {
		if (!(info instanceof ImporterInfo)) {
			throw new Error('The importer must be a valid ImporterInfo instance.');
		}

		info.importer = importer;

		this.importers.set(info.key, info);

		return this.importers.get(info.key);
	}

	/**
	 * Gets the importer information that is stored.
	 *
	 * @param key The key of the importer.
	 * @returns The importer information.
	 */
	get(key: string): ImporterInfo | undefined {
		return this.importers.get(key);
	}

	/**
	 * Gets all of the importers in array format.
	 *
	 * @returns The array of importer information.
	 */
	getAll(): Array<ImporterInfo> {
		return Array.from(this.importers.values());
	}
}

export const Importers = new ImportersContainer();
