"use client";
import { Header } from "@/app/_components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { months, years } from "@/constants/Dates";
import ErrorText from "@/app/_components/ErrorText";
import { usePaymentDetails } from "@/app/_context/PaymentDetails";

months;
years;

const paymentDetails = () => {
  const {
    country,
    first_name,
    last_name,
    card_number,
    expiry_date,
    cvc,
    errors,
    isFormValid,
    setCountry,
    setFirst_name,
    setLast_name,
    setCard_number,
    setExpiry_date,
    setCVC,
    handleSubmit,
  } = usePaymentDetails();

  const route = useRouter();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join("-");
    } else {
      return value;
    }
  };

  const onSubmit = async () => {
    const success = await handleSubmit();
    if (success) route.push("/");
  };

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
          <Select value={country} onValueChange={(value) => setCountry(value)}>
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
          <ErrorText message={errors.country} />
        </div>
        <div className="flex gap-3 ">
          <div className="flex flex-col gap-3">
            <Label>First name</Label>
            <Input
              value={first_name}
              onChange={(e) => {
                setFirst_name(e.target.value);
              }}
              placeholder="Enter your name her"
              className="w-[15.563rem] h-10 px-3 py-2"
            />
            <ErrorText message={errors.first_name} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Last name</Label>
            <Input
              value={last_name}
              onChange={(e) => {
                setLast_name(e.target.value);
              }}
              placeholder="Enter your name her"
              className="w-[15.563rem] h-10 px-3 py-2"
            />
            <ErrorText message={errors.last_name} />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label>Enter card number</Label>
          <Input
            type="text"
            maxLength={19}
            value={card_number}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              setCard_number(formatted);
            }}
            placeholder="XXXX-XXXX-XXXX-XXXX"
          />
          <ErrorText message={errors.card_number} />
        </div>
        <div className="flex w-[100%] h-[3.633rem] gap-4 ">
          <div className="flex flex-col gap-3">
            <Label>Expires</Label>
            <Select
              value={expiry_date.month}
              onValueChange={(value) =>
                setExpiry_date((prev) => ({ ...prev, month: value }))
              }
            >
              <SelectTrigger className="w-40 ">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-40 overflow-y-auto ">
                  {months.map((month, index) => {
                    return (
                      <SelectItem key={index} value={month.val}>
                        {month.month}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorText message={errors.expiry_date} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Year</Label>
            <Select
              value={expiry_date.year}
              onValueChange={(value) =>
                setExpiry_date((prev) => ({ ...prev, year: value }))
              }
            >
              <SelectTrigger className="w-40 ">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="h-40 overflow-y-auto ">
                  {years.map((year, index) => {
                    return (
                      <SelectItem key={index} value={year.val}>
                        {year.year}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ErrorText message={errors.expiry_date} />
          </div>
          <div className="flex flex-col gap-3">
            <Label>CVC</Label>
            <Input
              maxLength={3}
              value={cvc}
              onChange={(e) => {
                setCVC(e.target.value);
              }}
              placeholder="CVC"
              className="w-40 h-9 px-3 py-2"
            />
            <ErrorText message={errors.cvc} />
          </div>
        </div>
        <div className="w-[31.875rem] h-10 flex justify-end mt-6 ">
          <Button
            onClick={onSubmit}
            disabled={!isFormValid}
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
