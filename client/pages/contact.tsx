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

  const { data: contacts, mutate }: {
    data: IContact[];
    mutate: any;
  } = useSWR(`${setting.apiPath}/api/contact`, fetcher);

  useEffect(() => {

  }, []);

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
      </div>
    </Layout>
  );
};
