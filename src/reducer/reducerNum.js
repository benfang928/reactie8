export const reducer = (state = { num:0 }, action) => {
	switch (action.type) {  
        case 'test':  
            return {num: state.num + 1};  
        default:  
            return state;  
    } 
};
