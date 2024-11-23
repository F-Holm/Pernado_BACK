import { getRandomInt } from '@src/util/misc';
import { IChat } from '@src/models/Chat';
import { Chat } from './Conexion';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IChat | null> {
  return (await Chat.findOne({ id: id }));
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  return !!(await getOne(id));
}

/**
 * Get all users.
 */
async function getAll(): Promise<IChat[]> {
  return (await Chat.find({}));
}


/**
 * Add one user.
 */
async function add(chat: IChat): Promise<void> {
  do{
    chat.id = getRandomInt();
  } while(await persists(chat.id));
  await (new Chat(chat)).save();
}

/**
 * Update a user.
 */
async function update(chat: IChat): Promise<void> {
  await Chat.findOneAndUpdate({ id: chat.id }, new Chat(chat), { new: true });
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  await Chat.findOneAndDelete({ id: id });
}


// **** Export default **** //

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
