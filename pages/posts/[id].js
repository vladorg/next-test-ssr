
export async function getStaticPaths() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    const data = await response.json();

    const paths = data.map(({id}) => ({
        params: { id: id.toString() }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`);
        const data = await response.json();

        return { props: {data} }
    } catch (err) {
        console.warn(err);
        return { notFound: true }
    }
}


const Post = ({data}) => {
    return (
        <>
            <h1>{data.title} #{data.id}</h1>
            <hr/>
            <div>
                <em>{data.body}</em>
            </div>
        </>
    )
}

export default Post;