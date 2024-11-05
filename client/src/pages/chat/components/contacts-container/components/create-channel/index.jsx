import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Lottie from "react-lottie";  
import { animationDefaultOptions } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_CONTACTS_ROUTES, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { HOST } from "@/utils/constants";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multipleselect";

const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    const [newChannelModal, setNewChannelModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {withCredentials: true, });
            console.log(response)
            setAllContacts(response.data.contacts);
        };
        getData();
    }, []);

    const createChannel = async () => {

    }

  return (
    <>
        <TooltipProvider>
            <Dialog>
                <Tooltip>
                    <DialogTrigger asChild>
                        <FaPlus 
                            className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" 
                            onClick={() => setNewChannelModal(true)} 
                        />
                    </DialogTrigger>
                </Tooltip>
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please fill up the details for new channel</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Input 
                            placeholder="Channel Name" 
                            className="rounded-lg p-6 bg-[#2c2e3b] border-none" 
                            onChange={(e)=>{ setChannelName(e.target.value);}}
                            value={channelName}
                        />
                    </div>
                    <div>
                        <MultipleSelector className="rounded-lg bg-[#2c2e3b] border-none py-2 text-white" 
                        options={allContacts}
                        placeholder="Search Contacts"
                        value={selectedContacts}
                        onChange={setSelectedContacts}
                        emptyIndicator = {
                            <p className="text-center text-lg leading-10 text-gray-600">No results found.</p>
                        }
                        />
                    </div>
                    <div>
                        <Button className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>Create Channel</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </TooltipProvider>
        
        {/* <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus 
                        className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300" 
                        onClick={() => setOpenNewContactModal(true)} 
                    />
                </TooltipTrigger>
                <TooltipContent
                    className="bg-[#1c1b1e] border-none mb-2 border-none p-3 text-white"
                >
                    <p>Select New Contact</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogTrigger asChild>
                    <span />
                </DialogTrigger>
            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Please select a contact</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog> */}
    </>
  )
}

export default CreateChannel;