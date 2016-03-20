export default function map (files /* :object[] */) {
  /*
   * Goal: Create a map of links and unique IDs so that it is possible to dynamically
   * create routes based on the map.
   *
   * 'files' will be an array of files that contain the parsed comments.
   * [
   * 	file1,
   * 	file2,
   * 	file3,
   * 	file4,
   * ]
   *
   * Each file will contain the following keys:
   * file1 -> { id: String, path: String, result: [ 'description', 'tags', 'loc', 'context'] }
   *
   * Psuedo Code (so far):
   *
   * let map = {};
   * files.forEach(file => {
   * 	let { id, path } = file;
   * 	map[path] = id;
   * });
   * return map;
   */
  let map = {}
  return files.map(file => {
    let path = file.path.replace('.', '')
    if (!map[path]) return { [path]: file.id }
    return null
  }).filter(file => file !== null)
}
