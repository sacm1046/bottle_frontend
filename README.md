This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.





{/* Desktop Menu */}
                <ul className="navbar-nav ml-auto d-none d-lg-flex">
                    <li className="nav-item">
                        <Link href='/mycollection' className="nav-link" onClick={() => actions.handleRoute(`/bottles/category/1/1`, { id: 1, name: "EXCHANGE/TRADE" })}>
                            <a>TRADE<small> & </small>EXCHANGE</a>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        {/* eslint-disable-next-line */}
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown" data-target="#dropdownDesktop" id="navbarDropdown">
                            <a>Categories</a>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right">
                            <Link className="dropdown-item" href="/services" onClick={() => actions.handleRoute('/bottles/category/1/0', {}, props.history)}>
                                <a>ALL</a>
                            </Link>
                            {
                                store.categories.length > 0 && store.categories.map((category) => {
                                    if (category.name !== "EXCHANGE/TRADE") {
                                        return (
                                            <Link href='/mycollection' className="dropdown-item" key={category.id} onClick={() => actions.handleRoute(`/bottles/category/${category.id}/1`, category)}>
                                                <a>{category.name}</a>
                                            </Link>
                                        )
                                    }
                                    return null
                                }
                                )
                            }
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link href="/#cont" className="nav-link">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
