"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function Provinsi({ onChange, className,value }) {
    const [provinsi, setProvinsi] = React.useState([])
    const [selected, setSelected] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")

    React.useEffect(() => {
        fetch("/api/provinsi")
            .then((res) => res.json())
            .then((data) => {
                setProvinsi(data)
                if (value) {
                    setSelected(value.toString()) // jika value tersedia
                } else {
                    setSelected("") // kalau kosong, kosongkan pilihan
                }
            })
            .catch(() => setProvinsi([]))
    }, [])

    const filtered = provinsi.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    function handleSelect(value) {
        setSelected(value)
        onChange?.(value)
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    {selected
                        ? provinsi.find((p) => p.code.toString() === selected)?.name
                        : "Pilih Provinsi..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <input
                        type="text"
                        className=" mx-auto mt-3 w-4/5 px-4 py-2 text-sm rounded-lg mb-2"
                        placeholder="Cari provinsi..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <CommandList>
                        {filtered.length === 0 && (
                            <CommandEmpty>Tidak ada provinsi ditemukan.</CommandEmpty>
                        )}
                        <CommandGroup>
                            {filtered.map((p) => (
                                <CommandItem
                                    key={p.code}
                                    value={p.code.toString()}
                                    onSelect={handleSelect}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected === p.code.toString() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {p.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>

    )
}