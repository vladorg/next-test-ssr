import Link from "next/link";

export async function getServerSideProps(context) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        const data = await response.json();

        return { props: {data} }
    } catch (err) {
        console.warn(err);
        return { notFound: true }
    }
}

const Posts = ({data}) => {
    return (
        <>
            <h1>Posts page</h1>
            <hr/>
            <ul>
                {data.map(({id, title}) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                    </li>
                ))}
            </ul>

        </>     
    )
}

export default Posts;
