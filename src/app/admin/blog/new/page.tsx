
import PostForm from "../PostForm";
import { createPost } from "../actions";

export default function NewPost() {
  return (<div><h1 className="dash-title" style={{ marginBottom:20 }}>Novi tekst</h1><PostForm action={createPost} /></div>);
}
