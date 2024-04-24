import React, { useEffect, useState } from "react";
import "./CustomerInstantQuote.css";

import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { createClient } from "@supabase/supabase-js";


export default function CustomerInstantQuote() {
    const supabase = createClient(
        "https://tnfeykqptcbbabeuwwxn.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZmV5a3FwdGNiYmFiZXV3d3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4MDYxMTYsImV4cCI6MjAyMzM4MjExNn0.Y5FPy2jo_vo1ZjRFn9LkAyPMyItAKid_VSqkEkuHeqU"
    );
    const [quotes, setQuotes] = useState([]);

    async function getTempQuotes() {
        const { data, error } = await supabase
            .from("TempQuote")
            .select("*").order('id', { ascending: false });
        if (data !== null) {
            setQuotes(data);
        }
    }
    const init = useEffect(() => {
        getTempQuotes();
    }
        , []);
    return (
        <div>
            <Sidebar option5 />
            <Nav />
            <div className="cusQuotesPage">
                {quotes?.map((quote) => (
                    <div className="customerQuote">

                        <h3>Id: {quote.id}</h3>
                        <h3>Created At: {convertTimeStampToString(quote.created_at)}</h3>
                        <h3>Name: {quote.name}</h3>
                        <h3>Contact: {quote.contact}</h3>
                        <h3>From Address: {quote.fromAddress}</h3>
                        <h3>To Address: {quote.toAddress}</h3>
                        <h3>Item Description: {quote.itemDesc}</h3>
                    </div>

                ))}
            </div>

        </div>
    );
}

function convertTimeStampToString(date) {
    var d = new Date(date);
    var formattedDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + " " + (d.getHours() >= 12 ? "PM" : "AM");
    return formattedDate;
}