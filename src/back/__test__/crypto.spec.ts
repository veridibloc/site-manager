import {describe, it, expect} from "vitest"
import {encrypt,decrypt, createBip39Seed} from '../crypto';

const TestSecret = 'my-secret-key';

describe('crypto', () => {
    it("should encrypt and decrypt string as expected", () => {
            const cypherText =encrypt('Hello, World!', TestSecret);
            const decryptedText = decrypt(cypherText, TestSecret);
            expect(decryptedText).toBe('Hello, World!');
        }
    )
    it("should not be able to encrypt and decrypt string as keys are different", () => {
            const cypherText =encrypt('Hello, World!', TestSecret);
            expect(() => {
                decrypt(cypherText, TestSecret + '123');
            }).toThrow()
        }
    )
    it('should create random word lists', () => {
        let seeds = new Set<string>()
        const Rounds = 100;
        for(let i = 0; i < Rounds; i++) {
            const seed = createBip39Seed();
            if(seeds.has(seed)){
                throw new Error("!!!! Seed already exists")
            }
            seeds.add(seed);
        }
        expect(seeds.size).toBe(Rounds);
    })
})
