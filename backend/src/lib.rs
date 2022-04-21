use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Contract {
}


#[near_bindgen]
impl Contract {
    pub fn getName(&self, name: String) -> String {
        "Hello ".to_owned() + &name
    }
}