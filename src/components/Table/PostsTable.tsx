import { useRefContext } from "../RefContext";
import useDataStore from "../../store/dataStore";
import useDisplayStore from "../../store/displayStore";
import useInteractionStore from "../../store/interactionStore";
import Button from "../UI/Button";
import { TD, TH } from ".";
import TableInteraction from "../UI/TableInteraction";

const PostsTable = () => {
  const { deletePostRef, editPostRef, addPostRef } = useRefContext();
  const { users, posts, activeUser } = useDataStore();
  const { activeLink } = useDisplayStore();
  const { setActiveId } = useInteractionStore();

  const editPost = (id: number) => {
    setActiveId(id);
    editPostRef.current?.showModal();
  };
  const deletePost = (id: number) => {
    setActiveId(id);
    deletePostRef.current?.showModal();
  };
  return (
    activeLink === "users" || (
      <div className="overflow-auto h-full">
        <div className="sticky top-0 bg-stone-950">
          <div className="flex justify-between items-center w-full md:w-3/5 ms-auto mb-2 me-1">
            <h2 className="text-lg font-semibold">Posts</h2>
            <Button handleClick={() => addPostRef.current?.showModal()}>Add Post</Button>
          </div>
        </div>

        <table className="w-full table-fixed border-collapse text-sm">
          <colgroup>
            <col span={1} className="w-1/10 sm:w-1/20" />
            <col span={1} className="w-1/10 sm:w-1/20" />
            <col span={1} className="w-2/5 sm:w-1/2" />
            <col span={1} className="w-1/5" />
            <col span={1} className="w-1/5" />
          </colgroup>
          <thead>
            <tr>
              <TH>
                <span title="UID">User ID</span>
              </TH>
              <TH>
                <span title="PID">Post ID</span>
              </TH>
              <TH>
                <span title="Title">Title</span>
              </TH>
              <TH>
                <span title="User Name">User Name</span>
              </TH>
              <TH>
                <span title="Interactions" className="block text-end">
                  Interactions
                </span>
              </TH>
            </tr>
          </thead>
          <tbody>
            {activeUser
              ? posts
                  .filter((post) => post.userId === activeUser.id)
                  .map((post) => (
                    <tr key={post.id} className="group">
                      <TD>
                        <span title={`${post.userId}`}>{post.userId}</span>
                      </TD>
                      <TD>
                        <span title={`${post.id}`}>{post.id}</span>
                      </TD>
                      <TD>
                        <span title={post.title}>{post.title}</span>
                      </TD>
                      <TD>
                        <span title={users.find((user) => user.id === post.userId)?.name}>
                          {users.find((user) => user.id === post.userId)?.name}
                        </span>
                      </TD>
                      <TD>
                        <div className="text-end overflow-x-auto py-1 md:p-0">
                          <TableInteraction itemId={post.id} handleOperation={editPost}>
                            <span title="Edit Post">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>
                            </span>
                          </TableInteraction>
                          <TableInteraction itemId={post.id} handleOperation={deletePost}>
                            <span title="Delete Post">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </span>
                          </TableInteraction>
                        </div>
                      </TD>
                    </tr>
                  ))
              : posts.map((post) => (
                  <tr key={post.id} className="group">
                    <TD>
                      <span title={`${post.userId}`}>{post.userId}</span>
                    </TD>
                    <TD>
                      <span title={`${post.id}`}>{post.id}</span>
                    </TD>
                    <TD>
                      <span title={post.title}>{post.title}</span>
                    </TD>
                    <TD>
                      <span title={users.find((user) => user.id === post.userId)?.name}>
                        {users.find((user) => user.id === post.userId)?.name}
                      </span>
                    </TD>
                    <TD>
                      <div className="text-end overflow-x-auto py-1 md:p-0">
                        <TableInteraction itemId={post.id} handleOperation={editPost}>
                          <span title="Edit Post">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </span>
                        </TableInteraction>
                        <TableInteraction itemId={post.id} handleOperation={deletePost}>
                          <span title="Delete Post">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </span>
                        </TableInteraction>
                      </div>
                    </TD>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default PostsTable;
