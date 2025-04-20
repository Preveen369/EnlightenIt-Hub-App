import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail_container">
        <div className="post-detail_header">
          <PostAuthor />
          <div className="post-detail_buttons">
            <Link to={"/posts/werwer/edit"} className="btn sm primary">
              Edit
            </Link>
            <Link to={"/posts/werwer/delete"} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail_thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos velit
          necessitatibus corporis neque! Minima vitae optio consequatur earum
          deserunt accusantium corrupti, veniam, facere nam eum velit laudantium
          omnis aspernatur maxime officia odio quisquam ad, nulla officiis
          ratione illum tempora ipsa?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          laudantium corrupti. Cum eaque molestiae velit est. Repellat
          voluptatum adipisci tempora temporibus distinctio, quae debitis
          possimus quod aspernatur praesentium dolorem cumque accusamus sequi
          illo, minima perspiciatis esse veritatis voluptatibus ipsa asperiores.
          Facilis, provident minus, expedita odio saepe aut unde neque vitae,
          facere vel nesciunt aliquid deserunt.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, error
          delectus blanditiis omnis fugit animi ipsam quam autem nam excepturi
          commodi voluptates aut consequatur, a praesentium tenetur dignissimos
          laudantium ut vitae, molestiae officiis possimus sit? Quia libero
          cupiditate aliquam maiores numquam laboriosam ipsum modi iure tempora
          a perspiciatis hic reprehenderit, quae et, animi itaque labore ab quam
          nisi, magnam velit quaerat optio esse? Corporis enim aliquam
          necessitatibus consectetur minus dolore esse amet? Nam, molestias!
          Culpa odio adipisci officia, mollitia perspiciatis soluta architecto
          optio cupiditate, facilis sit itaque deserunt debitis a in blanditiis
          molestias temporibus tenetur incidunt dolor labore! Beatae provident
          voluptates dolores illo sit porro omnis similique vitae, aperiam
          maiores quod?
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam,
          consectetur? Iusto praesentium neque sequi eos quisquam explicabo eius
          optio mollitia?
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
