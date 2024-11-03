
const Ticket: React.FC= ()=>{
    const ticketColor= "#2E81EB"
    const ticketInfoHeight= "58%"
    return (
        <div 
        className="relative w-screen h-screen flex items-center px-3"
        style={{backgroundColor:ticketColor}}
        >

<div className="top-0 left-0 absolute w-full px-3 flex justify-between">
    <span>Ticket</span>
    <span>All Tickets</span>
    
</div>

            <div 
            className="w-full"
            style={{height:ticketInfoHeight}}
            >
                <div 
                className="bg-white w-full h-full mt-1 rounded-md"
                // style={{height:ticketInfoHeight}}
                >
                </div>
            </div>
        </div>
    )
}


export default Ticket;