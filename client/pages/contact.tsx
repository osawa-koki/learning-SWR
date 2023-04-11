import React, { useEffect, useState } from "react";

import useSWR from 'swr';
import { Button, Alert, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import setting from "../setting";

type IContact = {
  id: number;
  title: string;
  content: string;
  status: number;
  published_at: Date;
  closed_at: Date;
  created_at: Date;
  updated_at: Date;
};

const fetcher = url => fetch(url).then(r => r.json());

export default function ContactPage() {

  const [page, setPage] = useState(1);

  const { data: contacts, error, mutate }: {
    data: IContact[];
    error: any;
    mutate: any;
  } = useSWR(`${setting.apiPath}/api/contact?page=${page}`, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10000,
  });

  const Reload = () => {
    mutate();
  };

  useEffect(() => {

  }, []);

  if (error) return <p>Error: {error.message}</p>; // 追加
  if (!contacts) return <p>Loading...</p>;

  return (
    <Layout>
      <div id="Contact">

        <Table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>content</th>
              <th>status</th>
              <th>published_at</th>
              <th>closed_at</th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.id}</td>
                <td>{contact.title}</td>
                <td>{contact.content}</td>
                <td>{contact.status}</td>
                <td>{contact.published_at.toString()}</td>
                <td>{contact.closed_at.toString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          {/* ページネーション */}
          <Button variant="primary" onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }} className="d-block mt-3 m-auto">前へ</Button>
          <Button variant="primary" className="d-block mt-3 m-auto" onClick={() => {
            setPage(page + 1);
          }}>次へ</Button>
        </div>
        <Button variant="primary" onClick={Reload} className="d-block mt-3 m-auto">再読み込み</Button>
      </div>
    </Layout>
  );
};
