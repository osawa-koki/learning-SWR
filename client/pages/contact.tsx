import React, { useEffect, useState } from "react";

import useSWR from 'swr';
import { Button, Table } from 'react-bootstrap';
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
    data: {
      contacts: IContact[];
      pagination: {
        current_page: number;
        next_page: number | null;
        prev_page: number | null;
        total_pages: number;
        total_count: number;
      };
    };
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
          {contacts.contacts && Array.from({ length: 5 }).map((contact: IContact, index) => (
            <tr key={index}>
              {contacts.contacts[index] ? (
                <>
                  <td>{contacts.contacts[index].id}</td>
                  <td>{contacts.contacts[index].title}</td>
                  <td>{contacts.contacts[index].content}</td>
                  <td>{contacts.contacts[index].status}</td>
                  <td>{contacts.contacts[index].published_at.toString()}</td>
                  <td>{contacts.contacts[index].closed_at.toString()}</td>
                </>
              ) : (
                <td colSpan={6} className="invisible">Empty</td>
              )}
            </tr>
          ))}
          </tbody>
        </Table>
        <div className="mt-3 d-flex justify-content-between">
          <Button variant="primary" onClick={() => {
            if (contacts.pagination.prev_page) {
              setPage(page - 1);
            }
          }} className="d-block mt-3 m-auto" size="sm" disabled={contacts.pagination.prev_page === null}>前へ</Button>
          <Button variant="primary" onClick={Reload} className="d-block mt-3 m-auto" size="sm">再読み込み</Button>
          <Button variant="primary" onClick={() => {
            if (contacts.pagination.next_page) {
              setPage(page + 1);
            }
          }} className="d-block mt-3 m-auto" size="sm" disabled={contacts.pagination.next_page === null}>次へ</Button>
        </div>
      </div>
    </Layout>
  );
};
