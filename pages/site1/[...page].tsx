import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../../builder-registry";
import Header from "@/components/shared/navigation/header";
import Footer from "@/components/shared/navigation/footer";
import { GetStaticProps, GetStaticPaths } from "next";

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
const siteName = "site1";
import "@/styles/site1.css";


if (apiKey) {
  builder.init(apiKey);
} else {
  console.error("Builder API key is not defined");
}

interface PageProps {
  page: any;
}

export const getStaticProps: GetStaticProps<PageProps> = async (props) => {
  const { params } = props;

  let path =
    "/" +
    siteName +
    "/" +
    (Array.isArray(params?.page) ? params.page.join("/") : params?.page || "");

  console.log("path", path);
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: path,
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  let sitePages = pages
    .map((page) => String(page.data?.url))
    .filter((url) => url?.startsWith("/" + siteName + "/"));

  return {
    paths: sitePages,
    fallback: "blocking",
  };
};

const Page: React.FC<PageProps> = ({ page }) => {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      <Header />
      <div className="container mx-auto px-4">
        <BuilderComponent model="page" content={page || undefined} />
      </div>
      <Footer />
      <p className="text-gray-400 px-4">{siteName}</p>

    </>
  );
};

export default Page;
