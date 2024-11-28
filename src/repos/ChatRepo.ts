import { getRandomInt } from '@src/util/misc';
import { IChat } from '@src/models/Chat';
import { Chat } from './Conexion';
import {IMensaje} from '@src/models/Mensaje';

// **** Functions **** //

/**
 * Get one user.
 */
async function getOne(id: number): Promise<IChat | null> {
  return (await Chat.findOne({ id: id }));
}

/**
 * Get one user.
 */
async function tengoChat(id1: number, id2: number): Promise<boolean> {
  let chat: IChat | undefined | null = null;
  try {
    chat = (await Chat.findOne({
      $or: [
        { vendedor: id1, comprador: id2 },
        { vendedor: id2, comprador: id1 },
      ],
    }));
  } catch (e) {
    return false;
  }
  return chat !== undefined && chat !== null;
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
async function getMyChats(idMiembro: number): Promise<IChat[]> {
  return (await Chat.find({
    $or: [
      { comprador: idMiembro },
      { vendedor: idMiembro },
    ],
  }));
}

async function addMensaje(id: number, mensaje: IMensaje): Promise<void> {
  await Chat.updateOne( { id: id }, { $push: { mensajes: mensaje } } );
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
  await Chat.findOneAndUpdate({ id: chat.id }, chat, { new: true });
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
  addMensaje,
  tengoChat,
  getMyChats,
  update,
  delete: delete_,
} as const;
