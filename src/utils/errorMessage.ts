const errorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message ;
    } else {
        return "An unknown error occurred" ;
    }
};

export default errorMessage;