import { UserDocuments, Document } from "#src/models/index.js";
import asyncHandler from "express-async-handler";

const vaildDocumentId = asyncHandler(async (userId) => {
  const usersDocument = await UserDocuments.find(
    { userId: userId, done: 0 },
    { document_id: true }
  );
  return [...usersDocument];
});

const meetingMemberStatus = asyncHandler(async () => {
  const documentList = await Document.find({ done: 0 }, { _id: true }).populate(
    "user_id",
    "_id"
  );

  const result = {};

  documentList.forEach((document) => {
    result[document._id] = {};
    document.user_id.forEach((userDocument) => {
      result[document._id][userDocument._id] = 0;
    });
  });

  return result;
});

const findAllDocument = async (queries) => {
  const createor = await Document.find({ _id: queries }).populate(
    "user_id",
    "_id nickname profile_img"
  );

  const documenId = await Document.find({ _id: queries }, { _id });

  const partyUser = await UserDocuments.find({ _id: documenId }).populate(
    "user_id",
    "_id nickname profile_img"
  );

  const documenList = [createor, partyUser];
  return documenList.map((el) => {
    const users = el.UserDocuments.map((userInfo) => {
      return userInfo.User;
    });
    delete el.UserDocuments;
    return { ...el, users };
  });
};

const findDocument = async (queries) => {
  return Document.findOne({ _id: queries });
};

const findOrCreateUser_document = async (queries) => {
  const userId = UserDocuments.find({ queries }).populate("userId", "_id");
  const documenId = UserDocuments.find({ queries }).populate(
    "documentId",
    "_id"
  );

  return { userId, documenId };
};

const User_findDocument = async (queries) => {
  return UserDocuments.findOne({ queries });
};

const findUser = async (queries) => {
  // const req = attributes.map((el) => `${el}:true`);
  return await User.findOne({ _id: queries });
};

const modifyDocument = (documentLi) => {
  const sortedDocumentList = documentLi
    .reduce(
      (acc, cur) => {
        if (cur.currentNum >= cur.totalNum) {
          acc[1].push(cur);
          return acc;
        }
        acc[0].push(cur);
        return acc;
      },
      [[], []]
    )
    .flat();
  return sortedDocumentList; // 정보 각각 할당해줘야 될수도
};

export {
  vaildDocumentId,
  meetingMemberStatus,
  findAllDocument,
  findDocument,
  findOrCreateUser_document,
  User_findDocument,
  findUser,
  modifyDocument,
};
