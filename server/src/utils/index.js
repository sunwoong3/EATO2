import { UserDocumentss, Documents } from "#src/models/index.js";
import asyncHandler from "express-async-handler";

const vaildDocumentsId = asyncHandler(async (userId) => {
  const usersDocuments = await UserDocumentss.find(
    { userId: userId, done: 0 },
    { document_id: true }
  );
  return [...usersDocuments];
});

const meetingMemberStatus = asyncHandler(async () => {
  const documentList = await Documents.find(
    { done: 0 },
    { _id: true }
  ).populate("user_id", "_id");

  const result = {};

  documentList.forEach((document) => {
    result[document._id] = {};
    document.user_id.forEach((userDocuments) => {
      result[document._id][userDocuments._id] = 0;
    });
  });

  return result;
});

const findAllDocuments = async (queries) => {
  const createor = await Documents.find({ _id: queries }).populate(
    "user_id",
    "_id nickname profile_img"
  );

  const documenId = await Documents.find({ _id: queries }, { _id });

  const partyUser = await UserDocumentss.find({ _id: documenId }).populate(
    "user_id",
    "_id nickname profile_img"
  );

  const documenList = [createor, partyUser];
  return documenList.map((el) => {
    const users = el.UserDocumentss.map((userInfo) => {
      return userInfo.User;
    });
    delete el.UserDocumentss;
    return { ...el, users };
  });
};

const findDocuments = async (queries) => {
  return Documents.findOne({ _id: queries });
};

const findOrCreateUser_document = async (queries) => {
  const userId = UserDocumentss.find({ queries }).populate("userId", "_id");
  const documenId = UserDocumentss.find({ queries }).populate(
    "documentId",
    "_id"
  );

  return { userId, documenId };
};

const User_findDocuments = async (queries) => {
  return UserDocumentss.findOne({ queries });
};

const findUser = async (queries) => {
  // const req = attributes.map((el) => `${el}:true`);
  return await User.findOne({ _id: queries });
};

const modifyDocuments = (documentLi) => {
  const sortedDocumentsList = documentLi
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
  return sortedDocumentsList; // 정보 각각 할당해줘야 될수도
};

export {
  vaildDocumentsId,
  meetingMemberStatus,
  findAllDocuments,
  findDocuments,
  findOrCreateUser_document,
  User_findDocuments,
  findUser,
  modifyDocuments,
};
