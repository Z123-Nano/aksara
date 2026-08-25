import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'prasasti',
  title: 'Data Prasasti (Blockchain)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama User',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Aksara Jawa (Transliterasi)',
      type: 'string',
    }),
    defineField({
      name: 'signature',
      title: 'Hash Signature (Bukti Web3)',
      type: 'string',
      description: 'Kode unik tanda tangan dari MetaMask',
    }),
    defineField({
      name: 'timestamp',
      title: 'Waktu Pembuatan',
      type: 'datetime',
    }),
  ],
})