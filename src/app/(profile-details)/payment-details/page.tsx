"use client";
import { Header } from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Months, Years } from "@/app/_components/Dates";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const paymentDetails = () => {
  const [country, setCountry] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [card_number, setCard_number] = useState("");
  const [expiry_date, setExpiry_date] = useState("");
  const [user_id, setUser_id] = useState(0);
  const [errors, setErrors] = useState<{
    country?: string;
    first_name?: string;
    last_name?: string;
    card_number?: string;
    expiry_date?: string;
    user_id?: string;
  }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let errors: {
      country?: string;
      first_name?: string;
      last_name?: string;
      card_number?: string;
      expiry_date?: string;
      user_id?: string;
    } = {};

    if (!country) {
      errors.country = "Select country to continue";
    }
    if (!first_name) {
      errors.first_name = "First name must match";
    }
    if (!last_name) {
      errors.last_name = "Last name must match";
    }
    if (!card_number) {
      errors.card_number = "invalid card number";
    }
    if (!expiry_date) {
      errors.expiry_date = "invalid date";
    }
    if (!user_id) {
      errors.user_id = "invalid CVC";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
  }, [country, first_name, last_name, card_number, expiry_date, user_id]);

  const route = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] ">
      <Header />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl text-[#09090b] ">
            How would you like to be paid?
          </h2>
          <p className="font-normal text-sm text-[#71717a] ">
            Enter location and payment details
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Select country</Label>
          <Select>
            <SelectTrigger className="w-[100%] ">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="mongolia">Mongolia</SelectItem>
                <SelectItem value="australia">Australia</SelectItem>
                <SelectItem value="united states">United States</SelectItem>
                <SelectItem value="new zealand">New Zealand</SelectItem>
                <SelectItem value="united kingdom">United Kingdom</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3 ">
          <div className="flex flex-col gap-3">
            <Label>First name</Label>
            <Input
              placeholder="Enter your name her"
              className="w-[15.563rem] h-10 px-3 py-2"
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Last name</Label>
            <Input
              placeholder="Enter your name her"
              className="w-[15.563rem] h-10 px-3 py-2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Enter card number</Label>
          <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
        </div>
        <div className="flex w-[100%] h-[3.633rem] gap-4 ">
          <div className="flex flex-col gap-3">
            <Label>Expires</Label>
            <Months />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Year</Label>
            <Years />
          </div>
          <div className="flex flex-col gap-3">
            <Label>CVC</Label>
            <Input placeholder="CVC" className="w-40 h-9 px-3 py-2" />
          </div>
        </div>
        <div className="w-[31.875rem] h-10 flex justify-end ">
          <Button
            onClick={() => route.push("/")}
            className="px-4 py-2 w-[15rem] h-10 "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default paymentDetails;
